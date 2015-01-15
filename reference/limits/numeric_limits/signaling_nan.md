#signaling_NaN
```cpp
// C++03
static const T signaling_NaN() noexcept;

// C++11
static constexpr T signaling_NaN() noexcept;
```

##概要
浮動小数点数型において、シグナルを発生させるNaN (Not a Number)を取得する。


##要件
[`has_signaling_NaN`](./has_signaling_nan.md)` != false && `[`is_iec559`](./is_iec559.md)` != false`この要件を満たさない場合は`T()`が返る。


##戻り値
シグナルを発生させるNaN


##例外
投げない


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::signaling_NaN();
  constexpr float d = std::numeric_limits<double>::signaling_NaN();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* signaling_NaN[color ff0000]

###出力
```
float : 1.#QNAN
double : 1.#QNAN
```

##参照
* [`numeric_limits::has_quiet_NaN`](./signaling_nan.md)
* [NANの定義について - ぴょぴょぴょ？ - Linuxとかプログラミングの覚え書き](http://d.hatena.ne.jp/pyopyopyo/20100330/p1)

