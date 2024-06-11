# data
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ data = /*unspecified*/;
  }
}
```

## 概要
Rangeの要素が格納されたメモリ領域へのポインタを取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。このとき、式`ranges::data(E)`の効果は以下の通り。

1. `E`がrvalueかつ[`enable_borrowed_range`](enable_borrowed_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`であれば、呼び出しは不適格。
2. `T`が配列型かつ[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<T>`が不完全型であれば、呼び出しは不適格(診断不要)。
3. [`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.data())`が有効な式でその型がオブジェクトへのポインタであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.data())`と等しい。
4. [`ranges::begin`](begin.md)`(t)`が有効な式で、その型が[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)のモデルであれば、[`to_address`](/reference/memory/to_address.md)`(`[`ranges::begin`](begin.md)`(E))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeの要素が格納されたメモリ領域へのポインタ。

## カスタマイゼーションポイント
3か4の条件を満たすようにする。例えば、ユーザー定義のクラスにメンバ関数`data`を持たせるか、[`ranges::begin`](begin.md)を通じてカスタマイズできる。

## 備考
`ranges::data(E)`が有効な式であるとき、その型はオブジェクトへのポインタである。

## 例
```cpp example
#include <vector>
#include <iostream>
#include <ranges>

void some_c_like_api_function(const int* arr, std::size_t arr_size)
{
  std::cout << "array size:" << arr_size << " at " << static_cast<const void*>(arr) << std::endl;
}

int main()
{
  int arr[4] = {};
  some_c_like_api_function(std::ranges::data(arr), std::ranges::size(arr));
  std::vector<int> v { 12 };
  some_c_like_api_function(std::ranges::data(v), std::ranges::size(v));
}
```
* std::ranges::data[color ff0000]
* std::ranges::size[link size.md]

### 出力例
```
array size:4 at 0x7fff28ab1c50
array size:1 at 0x5596494f02b0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`std::data`](/reference/iterator/data.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
