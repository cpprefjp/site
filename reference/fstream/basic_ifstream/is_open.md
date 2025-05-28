# is_open
* fstream[meta header]
* std[meta namespace]
* basic_ifstream[meta class]
* function[meta id-type]

```cpp
bool is_open() const;
```

## 概要

開いている状態であることの判定をする。

## 戻り値

[`rdbuf()->is_open()`](/reference/fstream/basic_filebuf/is_open.md)

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::ifstream fs("foo", std::ios_base::in);
  if (fs.is_open()) {
    std::cout << "opened" << std::endl;
  }
}
```
* std::ifstream[link /reference/fstream/basic_ifstream.md]
* is_open()[color ff0000]

### 出力

```
```

## バージョン
### 言語
- C++98
