# stride

`size_t stride() const;`

## 概要

スライスを生成する間隔を得る。

## 戻り値

スライスを生成する間隔。

## 例

```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  constexpr auto start  = 3;
  constexpr auto length = 5;
  constexpr auto stride = 7;
  
  std::slice s( start, length, stride );
  
  std::cout << s.stride();
}
```

### 出力

```
7
```
