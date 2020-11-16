# move_sentinel
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<semiregular S>
  class move_sentinel;
}
```
* semiregular[link /reference/concepts/semiregular.md]

## 概要
`move_sentinel`は、[`move_iterator`](/reference/iterator/move_iterator.md)と共に任意のイテレータと番兵のペアをラップして、要素をムーブする範囲を表すための番兵アダプタである。

任意の入力イテレータ型`I`とその番兵型`S`が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<S, I>`のモデルである時、`move_iterator<I>`と`move_sentinel<S>`もまた`sentinel_for<move_sentinel<S>, move_iterator<I>>`のモデルとなる。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](move_sentinel/op_constructor.md.nolink) | コンストラクタ | C++11 |
| [`operator=`](move_sentinel/op_assign.md.nolink)          | 代入演算子 | C++11 |
| [`base`](move_sentinel/base.md.nolink)                    | 元の番兵を取得する | C++11 |

### `move_iterator`との間の操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](/reference/iterator/move_sentinel/op_equal.md.nolink)         | 等値比較 | C++20 |
| [`operator!=`](/reference/iterator/move_sentinel/op_equal.md.nolink)     | 非等値比較（`==`により使用可能） | C++20 |
| [`operator-`](/reference/iterator/move_sentinel/op_minus.md.nolink)          | `move_iterator`との距離を求める | C++20 |


## 例
```cpp example
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
#include <iterator>

int main()
{
}
```
* std::make_move_iterator[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6

## 関連項目

- [`move_iterator`](/reference/iterator/move_iterator.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
