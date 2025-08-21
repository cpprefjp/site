# close
* fstream[meta header]
* std[meta namespace]
* basic_ofstream[meta class]
* function[meta id-type]

```cpp
void close();
```

## 概要

ファイルを閉じる

## 効果

[`rdbuf()->close()`](/reference/fstream/basic_filebuf/close.md)を呼び出す。その戻り値がヌルポインタだった場合、[`setstate(failbit)`](/reference/ios/basic_ios/setstate.md)を呼び出す。

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::ofstream fs("foo");
  fs.close();
  std::cout << std::boolalpha << fs.is_open() << std::endl;
}
```
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* close()[color ff0000]

### 出力

```
false
```

## バージョン
### 言語
- C++98
