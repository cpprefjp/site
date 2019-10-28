# month
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class month;
}
```

## 概要
`month`は、特定の年に属するわけではない、月単体の値を表すクラスである。

通常は値の範囲として`[1, 12]`を扱うが、このクラスではその範囲外の値として`[0, 255]`まで扱える。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](month/op_constructor.md.nolink) | コンストラクタ | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator++`](month/op_increment.md.nolink) | インクリメント | C++20 |
| [`operator-=`](month/op_decrement.md.nolink) | デクリメント   | C++20 |
| [`operator+=`](month/op_plus_assign.md.nolink) | 加算の複合代入 | C++20 |
| [`operator-=`](month/op_minus_assign.md.nolink) | 加算の複合代入 | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator unsigned int`](month/op_unsigned_int.md.nolink)  | `unsigned int`型への変換演算子 | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](month/ok.md.nolink) | 値が範囲`[1, 12]`に収まっているか判定する | C++20 |


## 非メンバ関数
### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](month/op_plus.md.nolink)  | 加算 | C++20 |
| [`operator-`](month/op_minus.md.nolink) | 減算 | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](month/op_equal.md.nolink)         | 等値判定を行う | C++20 |
| [`operator<=>`](month/op_compare_3way.md.nolink) | 三方比較を行う | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](month/op_ostream.md.nolink) | 出力ストリームに出力する | C++20 |
| [`from_stream`](month/from_stream.md.nolink) | フォーマット指定して入力ストリームから入力する | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::month m = chrono::January;
  ++m;

  std::cout << m << std::endl;
}
```
* chrono::month[color ff0000]
* chrono::January[link month_constants.md.nolink]

### 出力
```
Feb
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 (入出力ストリームなし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)

