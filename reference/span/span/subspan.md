# subspan
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <std::size_t Offset, std::size_t Count = dynamic_extent>
constexpr span<element_type, see below>
  subspan() const;                                                   // (1)

constexpr span<element_type, dynamic_extent>
  subspan(size_type offset, size_type count = dynamic_extent) const; // (2)
```
* see below[italic]
* dynamic_extent[link /reference/span/dynamic_extent.md]

## 概要
任意の位置からN個の要素を参照する`span`オブジェクトを取得する。

- (1) : テンプレートパラメータで指定された任意の開始位置`Offset`と要素数`Count`にしたがって要素を取り出す
- (2) : パラメータで指定された任意の開始位置`offset`と要素数`count`にしたがって要素を取り出す


## 適格要件
- (1) : `Offset <= Extent && (Count ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| Count <= Extent - Offset)`が`true`であること


## 事前条件
(1)であれば`Offset`を`i`、`Count`を`N`とし、(2)であれば`offset`を`i`、`count`を`N`として、

- `i <=` [`size()`](size.md) `&& (N ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| N <=` [`size()`](size.md) `- i)`が`true`であること


## 戻り値
- (1) : 以下と等価：
    ```cpp
    return span<ElementType, see below>(
        data() + Offset, Count != dynamic_extent ? Count : size() - Offset);
    ```
    * data()[link data.md]
    * dynamic_extent[link /reference/span/dynamic_extent.md]
    * size()[link size.md]

    - ここで戻り値の型の第2テンプレート引数は以下になる：

    ```cpp
    Count != dynamic_extent   ? Count :
    (Extent != dynamic_extent ? Extent - Offset :
    dynamic_extent)
    ```

- (2) : 以下と等価：
    ```cpp
    return {data() + offset, count == dynamic_extent ? size() - offset : count};
    ```
    * data()[link data.md]
    * dynamic_extent[link /reference/span/dynamic_extent.md]
    * size()[link size.md]


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
  std::span<int, 5> s = std::span{v};

  // (1) : テンプレート引数として開始位置と要素数を指定して、要素を取得する。
  // テンプレート内でこのオーバーロードを使用する場合、s.template subspan<2, 3>(); のように、
  // template限定子の指定が必要になることに注意
  std::span<int, 3> static_span = s.subspan<2, 3>();
  for (int x : static_span) {
    std::cout << x << std::endl;
  }
  std::cout << std::endl;

  // (2) : 引数として開始位置と要素数を指定して、要素を取得する
  std::span<int, std::dynamic_extent> dynamic_span = s.subspan(2, 3);
  for (int x : dynamic_span) {
    std::cout << x << std::endl;
  }
}
```
* subspan[color ff0000]

### 出力
```
3
4
5

3
4
5
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
