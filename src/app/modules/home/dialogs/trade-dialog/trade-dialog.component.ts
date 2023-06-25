import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { Asset } from 'src/app/shared/interfaces/asset.interface';
import { CoinData } from 'src/app/shared/interfaces/coin-data';
import { Wallet } from 'src/app/shared/interfaces/wallet.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss']
})
export class TradeDialogComponent implements OnDestroy, OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  wallets: Wallet[] | undefined = [];
  assets: Asset[] | undefined = [];
  coinsData: CoinData[] = [];

  selectedWallet: Wallet | undefined;
  selectedAsset: Asset | undefined;
  selectedCoin: CoinData | undefined;
  
  tradeFormGroup: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 
    // Initialize the form group with form controls and validators
    this.tradeFormGroup = this.formBuilder.group({
      selectWalletControl: ['', Validators.required],
      selectAssetControl: ['', Validators.required],
      selectCoinControl: ['', Validators.required],
      balanceControl: ['', Validators.required],
      calculatedControl: ['', Validators.required]
    })
  }

  ngOnInit() {
    // Fetch options and currency data on component initialization
    this.fetchOptions();
    this.fetchCurrency();
    // Subscribe to form control value changes
    this.onOptionSelected();
    this.onAssetSelected();
    this.onCoinSelected();
  }

  ngOnDestroy() {
    // Unsubscribe from observables to prevent memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Fetch wallet options from the API
  fetchOptions() {
    this.apiService.getWallets().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error) => {
        // Handle network error here
        console.log('Network error:', error);
        alert('Network error:' + error);
        // Return an empty observable or a default value
        return of([]);
      })
    ).subscribe((data: any) => {
      this.wallets = data.wallets;
      if (this.wallets)
        this.selectedWallet = this.wallets[0];
    });
  }

  // Fetch currency data from the API
  fetchCurrency() {
    this.apiService.getCurrency().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error) => {
        // Handle network error here
        console.log('Network error:', error);
        alert('Network error:' + error);
        // Return an empty observable or a default value
        return of([]);
      })
    ).subscribe((coins: CoinData[]) => {
      this.coinsData = coins;
      if (this.coinsData)
        this.selectedCoin = this.coinsData[0];
    })
  }

  // Subscribe to changes in the selectWalletControl form control
  onOptionSelected() {
    this.tradeFormGroup.controls['selectWalletControl'].valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.assets = value.assets;
      if (this.assets)
        this.selectedAsset = this.assets[0];
    });
  }

  // Subscribe to changes in the selectAssetControl form control
  onAssetSelected() {
    this.tradeFormGroup.controls['selectAssetControl'].valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.getMaxBalance(); 
    })
  }

  // Subscribe to changes in the selectCoinControl form control
  onCoinSelected() {
    this.tradeFormGroup.controls['selectCoinControl'].valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.calcValue(); 
    })
  }

  // Update balanceControl form control with the maximum balance of the selected asset
  getMaxBalance() {
    this.tradeFormGroup.controls['balanceControl'].setValue(this.selectedAsset?.balance);
    this.calcValue();
  }

  // Calculate the value in the calculatedControl form control based on selectedCoin and selectedAsset values
  calcValue() {
    const selectedCoinRate = this.selectedCoin?.current_price;
    const selectedAssetRate = this.getRateBySymbol(this.selectedAsset?.symbol);
    const selectedAssetBalance = this.tradeFormGroup.controls['balanceControl'].value;
    if (selectedAssetRate && selectedAssetBalance && selectedCoinRate)
      this.tradeFormGroup.controls['calculatedControl'].setValue(selectedAssetRate * selectedAssetBalance / selectedCoinRate);
  }

  // Get the current price rate of a coin based on its symbol
  private getRateBySymbol(symbol: string | undefined): number {
    if (symbol === undefined) return 0;
    return this.coinsData.find(c => c.symbol.toLowerCase() === symbol.toLowerCase())?.current_price || 0;
  }

  // Stop event propagation
  stopPropagation(event: any) {
    event.stopPropagation();
  }

  // Handle form submission
  onSubmit() {
    const trade = {
      fromWallet: this.tradeFormGroup.value.selectWalletControl.name,
      fromAsset: this.tradeFormGroup.value.selectAssetControl.symbol,
      amount: this.tradeFormGroup.value.balanceControl,
      coin: this.tradeFormGroup.value.selectCoinControl.name,
      calculatedValue: this.tradeFormGroup.value.calculatedControl,
    }
    console.log(trade);
  }
}
