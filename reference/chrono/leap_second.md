# leap_second
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct leap_second;
}
```

## 概要
`leap_second`は、うるう秒が挿入された日時を秒単位で表す型である。

[`get_tzdb()`](get_tzdb.md)で取得した[`tzdb`](tzdb.md)クラスのオブジェクトに、これまでに挿入されたうるう秒のリスト`leap_seconds`がメンバ変数として含まれている。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `leap_second(const leap_second&) = default;`<br/> その他未規定の追加コンストラクタがある | コンストラクタ | C++20 |
| `leap_second& operator=(const leap_second&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`date`](leap_second/date.md.nolink) | うるう秒が挿入された日時を秒単位のシステム時間として取得する | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](leap_second/op_equal.md.nolink)         | 等値比較を行う | C++20 |
| `bool operator!=(const leap_second&, const leap_second&) noexcept;`<br/> `template <class Duration>`<br/> `bool operator!=(const leap&, const sys_time<Duration>);` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](leap_second/op_compare_3way.md.nolink) | 三方比較を行う | C++20 |
| [`operator<`](leap_second/op_less.md.nolink) | 左辺が右辺より小さいかを判定する | C++20 |
| [`bool operator<=`](leap_second/op_less_equal.md.nolink) | 左辺が右辺以下を判定する | C++20 |
| [`bool operator>`](leap_second/op_greater.md.nolink) | 左辺が右辺より大きいかを判定する | C++20 |
| [`bool operator>=`](leap_second/op_greater_equal.md.nolink) | 左辺が右辺以上を判定する | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [P1981R0 Rename `leap` to `leap_second`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1981r0.html)
    - C++20の策定中、National Body Commentとして`leap`というクラス名は一般的すぎて説明的ではないと指摘があり、`leap_second`に名称変更された
