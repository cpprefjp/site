# hh_mm_ss
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  class hh_mm_ss;
}
```

## 概要
`hh_mm_ss`は、任意の時間間隔型の値を、時:分:秒それと可能であれば秒未満の時間に分割するクラスである。秒未満の時間間隔はある非負の10の乗数ベースの単位の値である。

`Duration`テンプレートパラメータとしては、時間を分割する精度を指定する。

このクラスは、入力の時間間隔が負である場合でも動作するよう、負の時間間隔をモデル化する。ただし、負である場合でも、各フィールドは非負の時間間隔を返す。


## テンプレートパラメータ制約
- `Duration`が[`duration`](duration.md)クラステンプレートのインスタンスでない場合、プログラムは不適格となる


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](hh_mm_ss/op_constructor.md) | コンストラクタ | C++20 |
| `hh_mm_ss& operator=(const hh_mm_ss&) = default;`<br/> `hh_mm_ss& operator=(hh_mm_ss&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`is_negative`](hh_mm_ss/is_negative.md) | 負の時間かを判定する | C++20 |
| [`hours`](hh_mm_ss/hours.md)             | 時フィールドを取得する | C++20 |
| [`minutes`](hh_mm_ss/minutes.md)         | 分フィールドを取得する | C++20 |
| [`seconds`](hh_mm_ss/seconds.md)         | 秒フィールドを取得する | C++20 |
| [`subseconds`](hh_mm_ss/subseconds.md)   | 秒未満を取得する | C++20 |
| [`to_duration`](hh_mm_ss/to_duration.md) | 時:分:秒、秒未満をもつ`duration`オブジェクトに変換する | C++20 |
| [`operator precision`](hh_mm_ss/op_precision.md) | 時:分:秒、秒未満をもつ`duration`オブジェクトに明示的に変換する | C++20 |


## メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static constexpr bool` [`fractional_width`](hh_mm_ss/fractional_width.md) | `precision`によって表現される小数の小数桁数 | C++20 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|--------------------------------|-------|
| `precision` | 小数も含めて表現できる[`duration`](duration.md)型。[`duration`](duration.md)`<`[`common_type_t`](common_type.md)`<Duration::rep,` [`seconds`](duration_aliases.md)`::rep>,` [`ratio`](/reference/ratio/ratio.md)`<1, 10`<sup>`fractional_width`</sup>`>>` | C++20 |


## 非メンバ関数
### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](hh_mm_ss/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](hh_mm_ss/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // コンストラクタ引数からテンプレートパラメータDurationを推論
  chrono::hh_mm_ss time2{15h + 30min + 20s}; // 秒単位
  std::cout << time2 << std::endl;

  // 時間間隔の型を明示的に指定
  chrono::hh_mm_ss<chrono::seconds> time3{65745s}; // 秒単位
  std::cout << time3 << std::endl;

  chrono::hh_mm_ss time4{65745123ms}; // ミリ秒単位
  std::cout << time4 << std::endl;
}
```
* chrono::hh_mm_ss[color ff0000]
* 15h[link duration/op_h.md]
* 30min[link duration/op_min.md]
* 20s[link duration/op_s.md]
* 65745s[link duration/op_s.md]
* 65745123ms[link duration/op_ms.md]

### 出力
```
15:30:20
18:15:45
18:15:45.123
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 (出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 11.1 (出力ストリームなし) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
