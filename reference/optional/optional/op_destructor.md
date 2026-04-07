# デストラクタ
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
~optional();           // (1) C++17
constexpr ~optional(); // (1) C++23
```

## 概要
`optional`オブジェクトを破棄する。

## 効果
有効値を保持している場合、型`T`が非トリビアルなデストラクタを持っているならデストラクタを呼び出す。有効値を保持していない場合は、なにもしない。


## 備考
- (1) : `optional<T&>`の場合、内部的にはポインタを保持しているだけであるため、デストラクタはトリビアル (`= default`) であり、破棄時に特別な処理はしない


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
  {
    std::optional<A> a = std::make_optional<A>();
    std::optional<B> b = std::make_optional<B>();
    std::optional<C> c = std::make_optional<C>();

    std::optional<int> opt_int = 1;
  } // Aのデストラクタが呼ばれる
    // Bのデストラクタは呼ばれない
    // Cのデストラクタは呼ばれる
    // opt_intのデストラクタは呼ばれない

  {
    std::optional<A> a_null;
  } // Aのデストラクタは呼ばれない
}
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::vector`クラスのデストラクタ](/reference/vector/vector/op_destructor.md)
- [`std::is_trivially_destructible`](/reference/type_traits/is_trivially_destructible.md)
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
- [P2988R12 `std::optional<T&>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2988r12.pdf)
    - C++26で参照型`T&`に対する部分特殊化を追加
