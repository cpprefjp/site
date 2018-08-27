# directory_iterator
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class directory_iterator;
}
```

## 概要
`directory_iterator`は、ディレクトリ内を走査する入力イテレータクラスである。

このイテレータは、指定されたディレクトリ内のファイルを走査するが、ディレクトリ内のディレクトリをさらに走査はしない。再帰的にディレクトリを走査する場合は、[`std::filesystem::recursive_directory_iterator`](recursive_directory_iterator.md.nolink)クラスを使用する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](directory_iterator/op_constructor.md.nolink) | コンストラクタ | C++17 |
| `~directory_iterator();`                                | デストラクタ | C++17 |
| [`operator=`](directory_iterator/op_assign.md.nolink)          | 代入演算子 | C++17 |
| [`operator*`](directory_iterator/op_deref.md.nolink)    | 間接参照演算子 | C++17 |
| [`operator->`](directory_iterator/op_arrow.md.nolink)    | メンバアクセス演算子 | C++17 |
| [`operator++`](directory_iterator/op_increment.md.nolink)    | イテレータを進める | C++17 |
| [`increment`](directory_iterator/increment.md.nolink)    | イテレータを進める | C++17 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `iterator_category` | イテレータ種別 [`input_iterator_tag`](/reference/iterator/iterator_tag.md) | C++17 |
| `value_type` | 要素型 [`directory_entry`](directory_entry.md) | C++17 |
| `difference_type` | イテレータの差を表す符号あり整数型 [`std::ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++17 |
| `pointer` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`*` | C++17 |
| `reference` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`&` | C++17 |


## 非メンバ関数
### 範囲

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](directory_iterator/begin_free.md.nolink) | 先頭要素へのイテレータを取得する | C++17 |
| [`end`](directory_iterator/end_free.md.nolink) | 最後尾要素の次を指すイテレータを取得する | C++17 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](directory_iterator/op_equal.md.nolink)     | 等値比較 | C++17 |
| [`operator!=`](directory_iterator/op_not_equal.md.nolink) | 非等値比較 | C++17 |


## 例
```cpp example
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp):
