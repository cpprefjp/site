# デストラクタ
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
~optional();
```

## 概要
`optional`オブジェクトを破棄する


## 効果
有効値を保持している場合、型`T`が非自明なデストラクタを持っているならデストラクタを呼び出す。有効値を保持していない場合は、なにもしない。


## 例
```cpp example
#include <optional>

struct A {
  // ユーザー定義のデストラクタを持つ
  ~A()
  {
  }
};

struct B {
  // ユーザー定義のデストラクタを持たない
};

struct C {
  A a;

  // ユーザー定義のデストラクタを持つ。
  // (ユーザー定義のデストラクタを持つ型のメンバ変数を持っている)
};

int main()
{
  std::optional<A> a;
  std::optional<B> b;
  std::optional<C> c;

  std::optional<int> opt_int;
} // Aのデストラクタが呼ばれる
  // Bのデストラクタは呼ばれない
  // Cのデストラクタは呼ばれる
  // opt_intのデストラクタは呼ばれない
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::vector`クラスのデストラクタ](/reference/vector/op_destructor.md)
- [`std::is_trivially_destructible`](/reference/type_traits/is_trivially_destructible.md)
