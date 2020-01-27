# make_unique_default_init
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T> unique_ptr<T> make_unique_default_init();                                // (1)

  template<class T> unique_ptr<T> make_unique_default_init(size_t n);                        // (2)

  template<class T, class... Args> unspecified make_unique_default_init(Args&&...) = delete; // (3)
}
```
* unique_ptr[link unique_ptr.md]
* unspecified[italic]

## 概要
`unique_ptr`オブジェクトを構築する。その際、型`T`のオブジェクトはデフォルト構築される。

- (1) : `T`が配列型でないときに選択される。
- (2) : `T`が不明な境界の配列のときに選択される。
- (3) : 許可されていないオーバー�ードとして宣言される。`T`は既知の境界の配列型である。


## 戻り値
- (1) : `unique_ptr<T>(new T())`
- (2) : `unique_ptr<T>(new` [`remove_extent_t`](/reference/type_traits/remove_extent.md)`<T>[n]())`


## 例
```cpp example
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  std::unique_ptr<std::pair<int, int>> p1 = std::make_unique_default_init<std::pair<int, int>>();
  std::cout << p1->first << ':' << p1->second << std::endl;
}
```
* std::make_unique[color ff0000]

### 出力
```
0:0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0.0 現在未対応
- [GCC](/implementation.md#gcc): 10.0.0 現在未対応
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::make_unique()`](make_unique.md)


## 参照
- [P1020R1 Smart pointer creation with default initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1020r1.html)
