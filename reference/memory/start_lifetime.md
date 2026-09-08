# start_lifetime
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr void start_lifetime(T& r) noexcept; // (1) C++26
}
```

## 概要
参照先のオブジェクトの生存期間を明示的に開始する。

この関数は定数評価の中でも使用でき、主に、共用体メンバとして宣言した配列を未初期化ストレージとして使う場合に、その配列自体の生存期間を開始するために使用する。`r`が共用体のメンバを参照する場合、そのメンバは共用体のアクティブメンバとなる。


## 適格要件
`T`が完全型であり、かつ暗黙的生存期間型 (implicit-lifetime type) の集成体であること。


## 効果
- `r`が参照するオブジェクトがすでに生存期間内にある場合、なにもしない
- そうでない場合、`r`が参照するオブジェクトの生存期間を開始する
    - 初期化は行われず、部分オブジェクトの生存期間も開始されない
    - `r`が共用体`U`のメンバを表す場合、それは`U`のアクティブメンバとなる


## 例外
投げない。


## 備考
- [`start_lifetime_as()`](start_lifetime_as.md)は、記憶域を指すポインタ`void*`から型`T`のオブジェクトを暗黙的に構築し、ネストする暗黙的生存期間型の部分オブジェクトの生存期間も開始する。本関数は、すでに手元にある（が生存期間が開始されていない）オブジェクトを対象として、そのオブジェクト自体の生存期間だけを開始する点が異なる。定数評価で使用できるのは本関数のみである


## 例
```cpp
#include <memory>

struct A {
  union {
    int i;
    int arr[4];
  };
};

constexpr A a = [] {
  A a;
  // 共用体メンバの配列arrの生存期間を開始し、アクティブメンバにする
  // （各要素の生存期間はまだ開始されない）
  std::start_lifetime(a.arr);
  std::construct_at(&a.arr[0], 1);
  return a;
}();
static_assert(a.arr[0] == 1);

int main() {}
```
* std::start_lifetime[color ff0000]
* std::construct_at[link construct_at.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`start_lifetime_as()`](start_lifetime_as.md)
- [`start_lifetime_as_array()`](start_lifetime_as_array.md)
- [C++26 共用体メンバの生存期間規則の調整](/lang/cpp26/adjustments_to_union_lifetime_rules.md)


## 参照
- [P3726R2 Adjustments to Union Lifetime Rules](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3726r2.html)
