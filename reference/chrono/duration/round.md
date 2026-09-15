# round
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::chrono {
  template <class ToDuration, class Rep, class Period>
  constexpr ToDuration round(const duration<Rep, Period>& d);
}
```

## 概要
分解能が低い`duration`に変換する際に、最も近い値への丸めを行う。丸め先の候補となる2つの値からちょうど等距離にある場合のみ、偶数側の値に丸める (最近接偶数への丸め、ties to even)。


## 戻り値
`d`に最も近い値を返す。`d`が丸め先の候補となる2つの値からちょうど等距離にある場合は、偶数側の値を返す。


## 備考
- [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<typename ToDuration::rep>::value == true`である場合、この関数はオーバーロード解決の候補から外れる


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  milliseconds ms{1500};
  seconds s = round<seconds>(ms);

  std::cout << s.count() << std::endl;
}
```
* round[color ff0000]
* s.count()[link count.md]

### 出力
```
2
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Clang](/implementation.md#clang): 3.8 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------|------|
| [`duration_cast`](/reference/chrono/duration_cast.md) | ゼロ方向への丸め |
| [`floor`](floor.md)                                   | 負の無限大方向への丸め |
| [`ceil`](ceil.md)                                     | 正の無限大方向への丸め |


## 参照
- [P0092R1 Polishing `<chrono>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0092r1.html)
