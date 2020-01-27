# quiet_NaN
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
// C++03
static T quiet_NaN() throw();

// C++11
static constexpr T quiet_NaN() noexcept;
```

## 概要
浮動小数点数型において、シグナルを発生させないNaN (Not a Number)を取得する。  

`numeric_limits<float>::`[`has_quiet_NaN`](has_quiet_nan.md)が`true`のとき、`numeric_limits<float>::quiet_NaN()`は`NAN`マク�の値と�しい。


## 要件
[`has_quiet_NaN`](has_quiet_nan.md) `!= false &&` [`is_iec559`](is_iec559.md) `!= false`この要件を満たさない場合は`T()`が返る。


## 戻り値
シグナルを発生させないNaN


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::quiet_NaN();
  constexpr float d = std::numeric_limits<double>::quiet_NaN();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* quiet_NaN()[color ff0000]

### 出力
```
float : 1.#QNAN
double : 1.#QNAN
```

## 参照
* [`numeric_limits::has_quiet_NaN`](quiet_nan.md)
* [NANの定義について - ぴょぴょぴょ？ - Linuxとかプ�グラミングの覚え書き](http://d.hatena.ne.jp/pyopyopyo/20100330/p1)

