# time_zone_link
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class time_zone_link;
}
```

## 概要
`time_zone_link`は、タイムゾーンの代替名を管理する型である。

このクラスの機能は、[`std::chrono::locate_zone()`](/reference/chrono/locate_zone.md)内で使用される。

例として、キプロス共和国の首都ニコシアはアジアに属するが、多くのユーザーはヨーロッパで見つかることを期待している。ニコシアは、ヨーロッパとアジアどちらでも見つかるようリンクされており、現在の正式な地域だけでなく (Asia/Nicosia)、リンクされた地域も指定できるようになっている。

```cpp
using namespace std::chrono;

const time_zone* linked_tz = locate_zone("Europe/Nicosia"); // タイムゾーンの代替名

// 実際にタイムゾーンの時間計算に使用されるのはリンク先のタイムゾーン名
std::cout << linked_tz->name() << std::endl; // Asia/Nicosia
```
* locate_zone[link locate_zone.md]
* time_zone[link time_zone.md]
* name()[link time_zone/name.md]

また、`"UTC"`や`"GMT"`も代替名であり、本来の名前は`"Etc/UTC"`、`"Etc/GMT"`となっている。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `time_zone_link(time_zone_link&&) = default;`<br/> その他未規定の追加コンストラクタがある | コンストラクタ | C++20 |
| `time_zone_link& operator=(time_zone_link&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`name`](time_zone_link/name.md) | タイムゾーンの代替名を取得する | C++20 |
| [`target`](time_zone_link/target.md) | 代替名に対応するタイムゾーンの名前を取得する | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](time_zone_link/op_equal.md)         | 等値比較を行う | C++20 |
| `bool operator!=(const time_zone_link&, const time_zone_link&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](time_zone_link/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const time_zone_link&, const time_zone_link&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const time_zone_link&, const time_zone_link&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const time_zone_link&, const time_zone_link&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const time_zone_link&, const time_zone_link&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |



## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P1982R0 Rename `link` to `time_zone_link`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1982r0.html)
    - C++20の策定中、National Body Commentとして`link`というクラス名は一般的すぎて説明的ではないと指摘があり、`time_zone_link`に名称変更された
