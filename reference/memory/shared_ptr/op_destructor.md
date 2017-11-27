# デストラクタ
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~shared_ptr();
```

## `shared_ptr`オブジェクトの破棄
自身のみが所有権を持つ場合に、リソースを解放する。


## 効果
他の`shared_ptr`オブジェクトとリソースを共有している場合([`use_count()`](use_count.md) `> 1`)、効果なし。

自身のみが`shared_ptr`オブジェクトのリソースを所有している場合、[コンストラクタ](op_constructor.md)、[代入演算子](op_assign.md)、[`reset()`](reset.md)メンバ関数で代入された`Y*`型のポインタ`p`について、

- デリータを持っていれば`d(p)`でリソースを解放する。
- デリータを持っていなければ、`delete p`でリソースを解放する。

`p`が`T*`型ではなく`Y*`型であることに注意。これにより、`shared_ptr<void>`に対して任意の型`Y`のオブジェクトへのポインタを代入したとしても、`Y`型のデストラクタが正しく実行される。


## 備考
実際には`shared_ptr`は参照カウントで実装されるため、他の`shared_ptr`オブジェクトと所有権を共有している状態でデストラクタが実行された場合、参照カウントを`1`減らす、ということを行う。


## 例
```cpp example
#include <iostream>
#include <memory>

struct X {
  ~X()
  {
    std::cout << "X dtor" << std::endl;
  }
};

struct Y {
  ~Y()
  {
    std::cout << "Y dtor" << std::endl;
  }
};

int main()
{
  std::shared_ptr<void> p(new X());

  std::cout << 0 << std::endl;

  p.reset(new Y()); // Xが破棄される

  std::cout << 1 << std::endl;
} // Yが破棄される
```
* p.reset[link reset.md]

### 出力
```
0
X dtor
1
Y dtor
```

