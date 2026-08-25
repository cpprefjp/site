# do_get_time
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_get_time(iter_type s, iter_type end, ios_base& str,
                                ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
時刻を解析する。[`get_time()`](get_time.md)から呼び出される仮想関数である。


## 効果
`s`から文字を読み取り、[`time_put::put`](/reference/locale/time_put/put.md)が書式`"%H:%M:%S"`を生成するために使用する`tm`のメンバと残りの書式文字を抽出するまで、もしくはエラーか列の終端に遭遇するまで処理を続ける。


## 戻り値
妥当な時刻の一部でありうると認識した最後の文字の直後を指すイテレータ。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::get_time`](get_time.md)
- [`time_put::put`](/reference/locale/time_put/put.md)
