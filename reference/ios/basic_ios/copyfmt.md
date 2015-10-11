#copyfmt
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
basic_ios& copyfmt(const basic_ios& rhs);
```
* basic_ios[link ../basic_ios.md]

##概要
書式設定をコピーする。


##効果
もし `this == &rhs` であれば、何もしない。  
そうでなければ、以下のように引数 `rhs` のメンバオブジェクトを `*this` の対応するメンバオブジェクトに代入する。

- [`register_callback`](../ios_base/register_callback.md) で登録されているすべてのコールバックの組 `(fn, index)` について、`(*fn)(`[`erase_event`](../ios_base/type-event.md)`, this, index)` の形式で呼び出す。
- 以下の例外を除いて、引数 `rhs` のメンバオブジェクトを `*this` の対応するメンバオブジェクトに代入する。
    - [`rdstate`](rdstate.md)`()`、[`rdbuf`](rdbuf.md)`()`、[`exceptions`](exceptions.md)`()` は変更せずにそのままとする。
    - [`pword`](../ios_base/pword.md) と [`iword`](../ios_base/iword.md) は、私用記憶域の内容をコピーする。
    - `rhs` から `*this` にコピーされたポインタで、`rhs` オブジェクトの外のオブジェクトを指していて、かつ、`rhs` が破棄される際に `rhs` と同時に破棄されるオブジェクトを指しているポインタは、当該ポインタが指すオブジェクトをコピーし、そのオブジェクトを指すように変更する。
- [`register_callback`](../ios_base/register_callback.md) で登録されているすべてのコールバックの組 `(fn, index)` について、`(*fn)(`[`copyfmt_event`](../ios_base/type-event.md)`, this, index)` の形式で呼び出す。
- [`exceptions`](exceptions.md)`(rhs.`[`exceptions`](exceptions.md)`())` を呼び出す（結果として、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md) 例外が送出される可能性がある）。


##戻り値
`*this`


##備考
- 名前が示すように、書式設定はコピーするがストリームバッファ（[`rdbuf`](rdbuf.md)）、および、その状態（[`rdstate`](rdstate.md)`()`）はコピーしない。  
    ただし、[`exceptions`](exceptions.md)`()` は設定する。
- コールバックは [`erase_event`](../ios_base/type-event.md) と [`copyfmt_event`](../ios_base/type-event.md) の 2 回呼び出されるが、[`erase_event`](../ios_base/type-event.md) で呼び出されるのはもともと `*this` に登録されていたコールバック、[`copyfmt_event`](../ios_base/type-event.md) で呼び出されるのは `rhs` 側に登録されていた（本関数で `*this` にコピーされた）コールバックである。  
    [`erase_event`](../ios_base/type-event.md) で、`pword` の私用記憶域に格納されていたポインタが指すオブジェクトの破棄、[`copyfmt_event`](../ios_base/type-event.md) で `pword` の私用記憶域にコピーされたポインタが指すオブジェクトのコピー（あるいはポインタのヌルポインタへの変更）を行うことができる。  
    `pword` の私用記憶域に格納したポインタの対処については [`ios_base`](../ios_base.md)`::`[`pword`](../ios_base/pword.md) の例を参照。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cstddef>

int main()
{
  std::ostream os(NULL);
  os << std::hex << std::showbase << std::setw(10) << std::setfill('0') << std::internal;
  std::cout.copyfmt(os);
  std::cout << 10 << '\n';
}
```
* iostream[link ../../iostream.md]
* iomanip[link ../../iomanip.md]
* cstddef[link ../../cstddef.md]
* NULL[link ../../cstddef/null.md]
* ostream[link ../../ostream/basic_ostream.md]
* hex[link ../hex.md]
* showbase[link ../showbase.md]
* internal[link ../internal.md]
* setw[link ../../iomanip/setw.md.nolink]
* setfill[link ../../iomanip/setfill.md.nolink]
* copyfmt[color ff0000]
* cout[link ../../iostream/cout.md]

###出力
```
0x0000000a
```



##バージョン
###言語
- C++98

##参照
- [`basic_ios`](../basic_ios.md)`::`[`rdstate`](rdstate.md)
- [`basic_ios`](../basic_ios.md)`::`[`rdbuf`](rdbuf.md)
- [`basic_ios`](../basic_ios.md)`::`[`exceptions`](exceptions.md)
- [`ios_base`](../ios_base.md)`::`[`iword`](../ios_base/register_callback.md)
- [`ios_base`](../ios_base.md)`::`[`pword`](../ios_base/register_callback.md)
- [`ios_base`](../ios_base.md)`::`[`event`](../ios_base/type-event.md)
- [`ios_base`](../ios_base.md)`::`[`event_callback`](../ios_base/type-event_callback.md)
- [`ios_base`](../ios_base.md)`::`[`register_callback`](../ios_base/register_callback.md)
