#デストラクタ (C++11)
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]

```cpp
~shared_ptr();
```

##`shared_ptr`オブジェクトの破棄
自身のみが所有権を持つ場合に、リソースを解放する。


##効果
他の`shared_ptr`オブジェクトとリソースを共有している場合([`use_count()`](./use_count.md) `> 1`)、効果なし。

自身のみが`shared_ptr`オブジェクトのリソースを所有している場合、

- デリータを持っていれば`d(p)`でリソースを解放する。
- デリータを持っていなければ、`delete p`でリソースを解放する。


##備考
実際には`shared_ptr`は参照カウントで実装されるため、他の`shared_ptr`オブジェクトと所有権を共有している状態でデストラクタが実行された場合、参照カウントを`1`減らす、ということを行う。


