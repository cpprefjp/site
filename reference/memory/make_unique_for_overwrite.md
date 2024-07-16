# make_unique_for_overwrite
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  unique_ptr<T> make_unique_for_overwrite();                   // (1) C++20
  template<class T>
  constexpr unique_ptr<T> make_unique_for_overwrite();         // (1) C++23

  template<class T>
  unique_ptr<T> make_unique_for_overwrite(size_t n);           // (2) C++20
  template<class T>
  constexpr unique_ptr<T> make_unique_for_overwrite(size_t n); // (2) C++23

  template<class T, class... Args>
  unspecified make_unique_for_overwrite(Args&&...) = delete; // (3)
}
```
* unique_ptr[link unique_ptr.md]
* unspecified[italic]

## 概要
`unique_ptr`オブジェクトを構築する。その際、型`T`のオブジェクトはデフォルト構築される。

- (1) : `T`が配列型でないときに選択される。
- (2) : `T`が要素数不明の配列型のときに選択される。
- (3) : 許可されていないオーバーロードとして宣言される。`T`は要素数既知の配列型である。

## テンプレートパラメータ制約
- (1) : `T`は配列型ではない
- (2) : `T`は要素数不明の配列型（`U[]`）
- (3) : `T`は要素数既知の配列型（`U[N]`）

## 戻り値
- (1) : `unique_ptr<T>(new T)`
- (2) : `unique_ptr<T>(new` [`remove_extent_t`](/reference/type_traits/remove_extent.md)`<T>[n])`

## 備考

デフォルト構築においては、[トリビアルにデフォルト構築可能](/reference/type_traits/is_trivially_default_constructible.md)な型のオブジェクトは未初期化状態となるため、値を読みだす前に明示的に初期化（*overwrite*）する必要がある。初期化後の状態が不定になってほしくない場合はこの関数ではなく[`make_unique()`](make_unique.md)を使用すべき。

## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> i1 = std::make_unique_for_overwrite<int>();

  // 必ず初期化する
  *i1 = 0;

  std::cout << *i1 << std::endl;
}
```
* std::make_unique_for_overwrite[color ff0000]

### 出力
```
0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0.0 現在未対応 [mark verified]
- [GCC](/implementation.md#gcc): 10.0.0 現在未対応 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::make_unique()`](make_unique.md)


## 参照
- [P1020R1 Smart pointer creation with default initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1020r1.html)
- [P1973R1 Rename "_default_init" Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1973r1.pdf)
- [Why is `make_unique<T[N]>` disallowed? - stackoverflow](https://stackoverflow.com/questions/16596950/why-is-make-uniquetn-disallowed)
    - (3)のオーバーロードの意味について
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
