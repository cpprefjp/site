# tzdb_list
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class tzdb_list;
}
```

## 概要
`tzdb_list`は、タイムゾーンデータベースのリストであり、要素として読み取り専用のタイムゾーンデータベース[`tzdb`](tzdb.md)のオブジェクトをもつ。

このクラスのオブジェクトは、[`get_tzdb_list()`](get_tzdb_list.md)関数を使用することでシングルトンとして参照できる。

このクラスのオブジェクトは、長期間動かすプログラムにおいて、プログラム実行中にタイムゾーンデータベースが更新されるような状況のためにある。IANAのタイムゾーンデータベースは、毎月もしくは季節ごとに更新される。[`reload_tzdb()`](reload_tzdb.md)関数を呼び出すことで、このクラスのオブジェクトの先頭要素として最新のタイムゾーンデータベースが挿入され、古いタイムゾーンデータベースは後方に移動するようになっている。

[`get_tzdb()`](get_tzdb.md)関数、[`locate_zone()`](locate_zone.md)関数、[`current_zone()`](current_zone.md)では、このクラスの先頭要素である最新のタイムゾーンデータベースを参照するが、更新前の古いタイムゾーンデータベースを参照したい場合には、このクラスがもつイテレータを介することでそのようなタイムゾーンデータベースにアクセスできる。


## 備考
- このリストが最大および少なくとも何要素を保持できるかは未規定
- [`reload_tzdb()`](reload_tzdb.md)関数によって、新しいバージョンがあったらこのリストに要素が追加されるが、リストに要素を追加するためのメンバ関数は未規定


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `tzdb_list() = delete;`<br/> `tzdb_list(const tzdb_list&) = delete;`<br/> `tzdb_list(tzdb_list&&) = delete;`<br/> その他未規定の追加コンストラクタがある | コンストラクタ | C++20 |
| `tzdb_list& operator=(const tzdb_list&) = delete;`<br/> `tzdb_list& operator=(tzdb_list&&) = delete;` | 代入演算子 | C++20 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`front`](tzdb_list/front.md) | 先頭要素を取得する | C++20 |


### リストの変更

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_after`](tzdb_list/erase_after.md) | 指定したイテレータの次の要素を削除する | C++20 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](tzdb_list/begin.md)   | 先頭要素を指すイテレータを取得する | C++20 |
| [`end`](tzdb_list/end.md)       | 末尾の次を指すイテレータを取得する | C++20 |
| [`cbegin`](tzdb_list/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する | C++20 |
| [`cend`](tzdb_list/cend.md)     | 末尾の次を指す読み取り専用イテレータを取得する | C++20 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `const_iterator` | ForwardIterator要件を満たすイテレータ型 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::tzdb& tzdb = chrono::get_tzdb_list().front();
  const chrono::time_zone* tz = tzdb.locate_zone("Asia/Tokyo");
  std::cout << tz->name() << std::endl;
}
```
* chrono::get_tzdb_list()[link get_tzdb_list.md]
* front()[link tzdb_list/front.md]
* chrono::tzdb[link tzdb.md]
* tzdb.locate_zone[link tzdb/locate_zone.md]
* chrono::time_zone[link time_zone.md]
* tz->name()[link time_zone/name.md]

### 出力例
```
Asia/Tokyo
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
