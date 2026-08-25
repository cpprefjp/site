# tm
* ctime[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct tm {
    int tm_sec;   // 秒
    int tm_min;   // 分
    int tm_hour;  // 時
    int tm_mday;  // 日
    int tm_mon;   // 月 (1月からの月数)
    int tm_year;  // 年 (1900年からの年数)
    int tm_wday;  // 曜日 (日曜からの日数)
    int tm_yday;  // 年内通算日 (1月1日からの日数)
    int tm_isdst; // 夏時間フラグ
  };
}
```

## 概要
`tm`は、年月日・時分秒といった要素に分解されたカレンダー時間を保持する構造体である。[`localtime`](localtime.md)・[`gmtime`](gmtime.md)関数によって[`time_t`](time_t.md)値から生成され、[`mktime`](mktime.md)・[`asctime`](asctime.md)・[`strftime`](strftime.md)関数によって使用される。

各メンバ変数は、以下を意味する：

| 変数 | 説明 |
|------|------|
| `tm_sec`   | 秒。値の範囲は`[0, 60]` (60はうるう秒のため) |
| `tm_min`   | 分。値の範囲は`[0, 59]` |
| `tm_hour`  | 時。値の範囲は`[0, 23]` |
| `tm_mday`  | 日。値の範囲は`[1, 31]` |
| `tm_mon`   | 1月からの月数。値の範囲は`[0, 11]` (0が1月) |
| `tm_year`  | 1900年からの年数 (西暦年から1900を引いた値) |
| `tm_wday`  | 日曜からの曜日。値の範囲は`[0, 6]` (0が日曜) |
| `tm_yday`  | 1月1日からの年内通算日。値の範囲は`[0, 365]` |
| `tm_isdst` | 夏時間 (Daylight Saving Time) フラグ。夏時間が有効なら正、無効なら0、情報が得られない場合は負 |


## 備考
- メンバ変数の宣言順序は規定されていない。上記以外の追加メンバを持つ場合もある
- `tm_mon`は1月が`0`、`tm_year`は1900年からの経過年数である点に注意する。たとえば2026年1月であれば、`tm_mon`は`0`、`tm_year`は`126`となる


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 現在日時を、要素別のカレンダー時間に変換する
  std::time_t t = std::time(nullptr);
  std::tm* lt = std::localtime(&t);

  std::cout << (lt->tm_year + 1900) << "年"
            << (lt->tm_mon + 1) << "月"
            << lt->tm_mday << "日" << std::endl;
}
```
* std::tm[color ff0000]
* std::time[link time.md]
* std::localtime[link localtime.md]

### 出力例
```
2026年8月19日
```


## バージョン
### 言語
- C++98


## 関連項目
- [`time_t`](time_t.md)
- [`localtime`](localtime.md): 経過秒からローカル時間のカレンダー時間を生成する
- [`gmtime`](gmtime.md): 経過秒からUTCのカレンダー時間を生成する
- [`mktime`](mktime.md): カレンダー時間から経過秒を生成する
- [`strftime`](strftime.md): 指定したフォーマットでカレンダー時間を文字列化する
