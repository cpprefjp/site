# first
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <std::size_t Count>
constexpr span<element_type, Count>
   first() const;                             // (1)

constexpr span<element_type, dynamic_extent>
  first(size_type count) const;               // (2)
```
* dynamic_extent[link /reference/span/dynamic_extent.md]

## 概要
先�N個の要素を参照する`span`オブジェクトを取得する。

- (1) : テンプレートパラメータ`Count`で指定された要素数だけ先�から取り出す
- (2) : パラメータ`count`で指定された要素数だけ先�から取り出す


## 適格要件
- (1) : `Count <= Extent`が`true`であること


## 事前条件
- (1) : `Count <=` [`size()`](size.md)が`true`であること
- (2) : `count <=` [`size()`](size.md)が`true`であること


## 戻り値
(1)であれば`Count`を`N`、(2)であれば`count`を`N`として、以下と�価：

```cpp
return {data(), N};
```
* data()[link data.md]


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::span s{v};

  // (1) : テンプレート引数として要素数を指定して、先�3要素を取得する。
  // テンプレート内でこのオーバー�ードを使用する場合、s.template first<3>(); のように、
  // template限定�の指定が必要になることに注意
  std::span<int, 3> static_span = s.first<3>();
  for (int x : static_span) {
    std::cout << x << std::endl;
  }
  std::cout << std::endl;

  // (2) : 引数として要素数を指定して、先�3要素を取得する
  std::span<int, std::dynamic_extent> dynamic_span = s.first(3);
  for (int x : dynamic_span) {
    std::cout << x << std::endl;
  }
}
```
* first[color ff0000]
* std::dynamic_extent[link /reference/span/dynamic_extent.md]

### 出力
```
1
2
3

1
2
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
- [LWG Issue 3103. Errors in taking subview of `span` should be ill-formed where possible](https://wg21.cmeerw.net/lwg/issue3103)
