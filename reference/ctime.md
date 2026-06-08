# ctime
* ctime[meta header]

`<ctime>`ヘッダでは、日付と時間に関する機能を定義する。

## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`NULL`](/reference/cstddef/null.md) | ヌルポインタ定数 | |
| `CLOCKS_PER_SEC` | `clock()`関数によって返される1秒あたりの数値 | |
| [`TIME_UTC`](ctime/time_utc.md) | UTC時間ベースであることを指定するための0より大きい整数定数値 | C++17 |
| [`TIME_MONOTONIC`](ctime/time_monotonic.md) | 単調増加時間ベースであることを指定するための整数定数値 (処理系定義) | C++26 |
| [`TIME_ACTIVE`](ctime/time_active.md) | プロセスのCPU時間ベースであることを指定するための整数定数値 (処理系定義) | C++26 |
| [`TIME_THREAD_ACTIVE`](ctime/time_thread_active.md) | スレッドのCPU時間ベースであることを指定するための整数定数値 (処理系定義) | C++26 |
| `__STDC_VERSION_TIME_H__` | `<ctime>`が提供するC標準ライブラリ機能のバージョン (`202311L`) | C++26 |


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size_t`](/reference/cstddef/size_t.md) | 符号なし整数型 | |
| `clock_t` | `clock()`関数が返すプロセッサ時間を表す型 | |
| [`time_t`](/reference/ctime/time_t.md) | 時間を表す型 | |


## 構造体

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`timespec`](ctime/timespec.md) | 指定されたベース時間に基づいた、経過秒と経過ナノ秒を保持する型 | C++17 |
| `tm` | カレンダー時間を保持する型 | |


## 関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `clock`        | プログラム実行開始からの経過時間を取得する | |
| `difftime`     | 2つの時間の差を計算する | |
| `mktime`       | カレンダー時間から経過秒を生成する | |
| [`timegm`](ctime/timegm.md)       | UTCのカレンダー時間から経過秒を生成する | C++26 |
| `gmtime`       | 経過秒からカレンダー時間を生成する | |
| [`gmtime_r`](ctime/gmtime_r.md)     | 経過秒からカレンダー時間を生成する (利用者が用意したバッファに格納する) | C++26 |
| `localtime`    | 経過秒からローカル時間のカレンダー時間を生成する | |
| [`localtime_r`](ctime/localtime_r.md)  | 経過秒からローカル時間のカレンダー時間を生成する (利用者が用意したバッファに格納する) | C++26 |
| `time`         | 現在時間までの経過秒を取得する | |
| [`timespec_get`](ctime/timespec_get.md) | 指定したベース時間に基づいた、経過秒と経過ナノ秒を取得する | C++17 |
| [`timespec_getres`](ctime/timespec_getres.md) | 指定したベース時間の分解能を取得する | C++26 |
| [`asctime`](ctime/asctime.md) | カレンダー時間を文字列化する | C++26で非推奨 |
| [`ctime`](ctime/ctime.md)     | 経過秒を日時として文字列化する | C++26で非推奨 |
| `strftime`     | 指定したフォーマットでカレンダー時間を文字列化する | |


## 関連項目
- [`<chrono>`](chrono.md)


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、`timegm`・`gmtime_r`・`localtime_r`・`timespec_getres`と、`TIME_MONOTONIC`・`TIME_ACTIVE`・`TIME_THREAD_ACTIVE`・`__STDC_VERSION_TIME_H__`が追加された。また`asctime`・`ctime`が非推奨となった
