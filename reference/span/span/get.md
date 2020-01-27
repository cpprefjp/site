# get
* span[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <size_t I, class ElementType, size_t Extent>
  constexpr ElementType& get(span<ElementType, Extent> s) noexcept;
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
タプルと見なせる型から指定した位置の要素を取得する。

`<span>`ヘッダでは、`span`クラスに関するオーバー�ードを定義する。

静的な要素数をもつ`span`クラスオブジェクトに対してのみ、タプルインタフェースを使用できる。


## 適格要件
- `Extent !=` [`dynamic_extent`](/reference/span/dynamic_extent.md) `&& I < Extent`であること


## 戻り値
以下と�価：

```cpp
return `s[I]`;
```


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <span>
#include <cassert>

int main()
{
  int ar[] = {1, 2, 3, 4, 5};
  std::span s{ar};

  // 1番目の要素を取得
  int& x = std::get<1>(s);
  assert(x == 2);
}
```
* std::get[color ff0000]


### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
