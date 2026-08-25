# do_get
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  virtual iter_type do_get(iter_type s, iter_type end, ios_base& f,
                           ios_base::iostate& err, tm* t,
                           char format, char modifier) const; // (1) C++11
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
書式指定子を指定して日時を解析する。[`get()`](get.md)から呼び出される仮想関数である。


## 事前条件
`t`がオブジェクトを指していること。


## 効果
`err = `[`std::ios_base::goodbit`](/reference/ios/ios_base/type-iostate.md)を評価したのち、`s`から文字を読み取る。エラーに遭遇するか、`'%'`・`modifier`（非NULの場合）・`format`を連結して形成される、POSIX関数`strptime`にとって適切な変換指定に対応する`tm`のメンバと残りの書式文字を抽出して代入し終えるまで、処理を続ける。

連結が完全かつ妥当な指定を与えない場合、`t`が指すオブジェクトは変更せず、`err |= `[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を評価する。

文字を読み取った後に`s == end`が`true`となる場合、`err |= `[`std::ios_base::eofbit`](/reference/ios/ios_base/type-iostate.md)を評価する。

`%c`・`%x`・`%X`のような複雑な変換指定、もしくは省略可能な修飾子`E`や`O`を伴う変換指定において、入力列`[s, end)`から一部またはすべての`tm`のメンバを曖昧さなく決定できない場合、`err |= `[`std::ios_base::eofbit`](/reference/ios/ios_base/type-iostate.md)を評価する。この場合、それらの`tm`のメンバの値は未規定であり、妥当な範囲の外にある可能性がある。


## 戻り値
与えられた`format`と`modifier`に対する妥当な入力列の一部でありうると認識した、最後の文字の直後を指すイテレータ。


## 備考
同じ`tm`オブジェクトのアドレスに対して`do_get()`を複数回呼び出したとき、オブジェクトの現在の内容が更新されるのか、単にメンバが上書きされるのかは未規定である。移植性のあるプログラムでは、この関数を呼び出す前にオブジェクトをゼロクリアすべきである。

## バージョン
### 言語
- C++11


## 関連項目
- [`time_get::get`](get.md)
