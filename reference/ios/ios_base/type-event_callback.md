# event_callback
* ios[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
using event_callback = void(*)(event ev, ios_base& str, int index);
```
* event[link type-event.md]
* ios_base[link ../ios_base.md]

## 概要
`event_callback` は [`register_callback`](register_callback.md) で登録するコールバック関数を表す型である。  
イベントが発生して当該関数が呼ばれる際には、`ev` には発生したイベントの種類（[`event`](type-event.md)）が、`str` にはイベントが発生したストリームが、`index` には [`register_callback`](register_callback.md) での登録時に指定した値がそれぞれ渡される。


## 備考
[`register_callback`](register_callback.md) で登録する関数は例外を投げてはいけない。


## 例
[`event`](type-event.md) の例を参照


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`register_callback`](register_callback.md)
- [`ios_base`](../ios_base.md)`::`[`event`](type-event.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](imbue.md)
- [`ios_base`](../ios_base.md)`::`[`getloc`](getloc.md)
- [`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md)
- [`basic_ios`](../basic_ios.md)`::`[`exceptions`](../basic_ios/exceptions.md)
