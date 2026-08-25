# do_get_date
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_get_date(iter_type s, iter_type end, ios_base& str,
                                ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
日付を解析する。[`get_date()`](get_date.md)から呼び出される仮想関数である。


## 効果
`s`から文字を読み取り、[`time_put::put`](/reference/locale/time_put/put.md)が以下のいずれかの書式を生成するために使用する`tm`のメンバと残りの書式文字を抽出するまで、もしくはエラーに遭遇するまで処理を続ける。

書式は[`date_order()`](date_order.md)が返す値によって決まる。

| [`date_order()`](date_order.md) | 書式 |
|---------------------------------|------|
| `no_order` | `"%m%d%y"` |
| `dmy`      | `"%d%m%y"` |
| `mdy`      | `"%m%d%y"` |
| `ymd`      | `"%y%m%d"` |
| `ydm`      | `"%y%d%m"` |

処理系は、これら以外の書式を追加で受け付けてもよい（処理系定義）。


## 戻り値
妥当な日付の一部でありうると認識した最後の文字の直後を指すイテレータ。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::get_date`](get_date.md)
- [`time_get::date_order`](date_order.md)
- [`time_base`](/reference/locale/time_base.md)
