# 推論補助
* array[meta header]
* std[meta namespace]
* array[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class... U>
  array(T, U...) -> array<T, 1 + sizeof...(U)>;
}
```

## 概要
`std::array`クラステンプレートの型推論補助。


## 要件
- `U...`のすべての型は、型`T`と同じ型であること


## 備考
- `std::array`クラステンプレートは0要素の配列もサポートしているが、推論補助では1要素以上の配列しか受け付けられない。0要素の配列からは、要素型が推論できない


## 例
```cpp example
#include <array>
#include <type_traits>

int main()
{
  std::array ar = {1, 2, 3};
  static_assert(std::is_same_v<
    decltype(ar),
    std::array<int, 3>
  >);

  // 受け付けない例1
  // 0要素の配列
  // std::array empty_ar {}; // コンパイルエラー！0要素配列はstd::arrayに推論できない

  // 受け付けない例2
  // 異なる要素型の配列
  // int mixed_raw_ar[] = {1, 0u}; // OK。異なる要素型が混ざっていても、左辺の型によって要素がint型に変換される
  // std::array mixed_ar = {1, 0u}; // コンパイルエラー！すべての要素型は同じ型となるべき

  // 受け付けない例3
  // 文�列リテラルの代入
  // std::array s = "Hello"; // コンパイルエラー！std::array<char, 6>を意図していたが、ポインタに変換されて推論できない
  // std::array s {"Hello"}; // OKだが、std::array<const char*, 1>となる
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.1.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

