#event_callback
* ios[meta header]
* typedef[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
typedef void (*event_callback)(event ev, ios_base& str, int index);
```
* event[link type-event.md]
* ios_base[link ../ios_base.md]

##概要
`event_callback` は　[`register_callback`](register_callback.md) で登録するコールバック関数を表す型である。  
イベントが発生して当該関数が呼ばれる際には、`ev` には発生したイベントの種類（[`event`](type-event.md)）が、`str` にはイベントが発生したストリームが、`index` には [`register_callback`](register_callback.md) での登録時に指定した値がそれぞれ渡される。


##例
[`event`](type-event.md) の例を参照


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`ios_base`](../ios_base.md)`::`[`register_callback`](register_callback.md)
- [`ios_base`](../ios_base.md)`::`[`event`](type-event.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md.nolink)
- [`ios_base`](../ios_base.md)`::`[`imbue`](imbue.md)
- [`ios_base`](../ios_base.md)`::`[`getloc`](getloc.md)
- [`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md.nolink)
- [`basic_ios`](../basic_ios.md)`::`[`exceptions`](../basic_ios/exceptions.md.nolink)
