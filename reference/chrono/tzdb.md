# tzdb
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct tzdb;
}
```

## 概要
`tzdb`は、タイムゾーンデータベースの情報にアクセスするためのクラスである。

タイムゾーンデータベースは、RFC 6557においてIANA Time Zone databaseとして説明される。このクラスは、UTCタイムゾーンをもつシステム時間と、ユーザー指定のタイムゾーンをもつローカル時間の間の変換において使用される。

このクラス内の各リストオブジェクトは、高速に検索ができるようソートされる。

タイムゾーンデータベースは、[`std::chrono::get_tzdb()`](get_tzdb.md.nolink)関数を使用することでこのクラスのオブジェクトとして取得できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`locate_zone`](tzdb/locate_zone.md.nolink)   | 指定した名前のタイムゾーンを取得する | C++20 |
| [`current_zone`](tzdb/current_zone.md.nolink) | 現在のタイムゾーンを取得する | C++20 |


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`string`](/reference/string/basic_string.md) `version;` | タイムゾーンデータベースのバージョン文字列 | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`time_zone`](time_zone.md)`> zones;` | タイムゾーンデータベースが保持するタイムゾーンのリスト | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`link`](link.md.nolink)`> links;` | タイムゾーンデータベースが保持するタイムゾーンリンクのリスト | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`leap`](leap.md.nolink)`> leaps;` | タイムゾーンデータベースが保持するうるう秒のリスト | C++20 |


## 例
```cpp example
```


### 出力例
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)

