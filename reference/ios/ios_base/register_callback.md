# register_callback
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
void register_callback(event_callback fn, int index);
```
* event_callback[link type-event_callback.md]

## 概要
コールバック関数を登録する。


## 要件
引数 `fn` で指定された関数は例外を投げてはいけない。


## 効果
引数で指定された関数 `fn` を、[`imbue`](imbue.md)`()`、[`copyfmt`](../basic_ios/copyfmt.md)`()`、および、[`~ios_base`](op_destructor.md)`()` が呼び出された際に引数の `index` と共にコールバック関数として呼び出すよう登録する。

登録されたコールバック関数は、登録と逆の順序で呼び出される。

あるコールバック関数が呼び出されている�で登録されたコールバック関数は、次のイベントまで呼び出されない。


## 戻り値
なし


## 備考
引数 `fn` と `index` のペアが同じ組を 2 回以上登録した場合でも、特にマージ�は行われない（つまり、登録された回数だけ呼び出される）。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>

void f(std::ios_base::event e, std::ios_base& str, int index)
{
  switch (e) {
  case std::ios_base::erase_event:
    std::cout << "event = erase_event, ";
    break;
  case std::ios_base::copyfmt_event:
    std::cout << "event = copyfmt_event, ";
    break;
  case std::ios_base::imbue_event:
    std::cout << "event = imbue_event, ";
    break;
  }
  std::cout << "index = " << index << '\n';

  str.register_callback(f, (index + 1) % 3);
}

int main()
{
  std::locale l;

  std::stringstream ss;
  ss.register_callback(f, 0);

  std::cout << "imbue 1 start\n";
  ss.imbue(l);
  std::cout << "imbue 1 end\n";

  std::cout << "imbue 2 start\n";
  ss.imbue(l);
  std::cout << "imbue 2 end\n";

  std::cout << "imbue 3 start\n";
  ss.imbue(l);
  std::cout << "imbue 3 end\n";
}
```
* std::ios_base[link ../ios_base.md]
* std::basic_ios[link ../basic_ios.md]
* std::stringstream[link ../../sstream/basic_stringstream.md.nolink]
* erase_event[link type-event.md]
* copyfmt_event[link type-event.md]
* imbue_event[link type-event.md]
* std::locale[link ../../locale/locale.md]
* register_callback[color ff0000]
* imbue[link imbue.md]

### 出力
```
imbue 1 start
event = imbue_event, index = 0
imbue 1 end
imbue 2 start
event = imbue_event, index = 1
event = imbue_event, index = 0
imbue 2 end
imbue 3 start
event = imbue_event, index = 1
event = imbue_event, index = 2
event = imbue_event, index = 1
event = imbue_event, index = 0
imbue 3 end
event = erase_event, index = 1
event = erase_event, index = 2
event = erase_event, index = 0
event = erase_event, index = 2
event = erase_event, index = 1
event = erase_event, index = 2
event = erase_event, index = 1
event = erase_event, index = 0
```


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`event`](type-event.md)
- [`ios_base`](../ios_base.md)`::`[`event_callback`](type-event_callback.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](imbue.md)
- [`ios_base`](../ios_base.md)`::`[`getloc`](getloc.md)
- [`basic_ios`](../basic_ios.md)`::`[`copyfmt`](../basic_ios/copyfmt.md)
- [`basic_ios`](../basic_ios.md)`::`[`exceptions`](../basic_ios/exceptions.md)
