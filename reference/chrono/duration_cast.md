# duration_cast
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class ToDuration, class Rep, class Period>
  constexpr ToDuration duration_cast(const duration<Rep, Period>& d);
}}
```

## 概要
分解能が低い[`duration`](/reference/chrono/duration.md)への変換。

その際の丸めは、ゼ�方向への丸め (切り捨て、truncate) が行われる。


## 戻り値
テンプレートパラメータ`ToDuration`で指定された型に変換された[`duration`](/reference/chrono/duration.md)。


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  milliseconds ms(1100);
//seconds s = ms;                         // error! 変換できない
  seconds s = duration_cast<seconds>(ms); // OK

  std::cout << s.count() << std::endl;
}
```
* duration_cast[color ff0000]
* s.count()[link duration/count.md]

### 出力
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 関連項目

| 名前 | 説明 |
|------|------|
| [`floor`](duration/floor.md) | 負の無限大方向への丸め |
| [`ceil`](duration/ceil.md)   | �の無限大方向への丸め |
| [`round`](duration/round.md) | 偶数方向への丸め |
