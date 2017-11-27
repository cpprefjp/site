# push_back
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void push_back(charT c);
```

## 概要
末尾に要素を追加する。


## 効果
[`append`](append.md)`(static_cast<size_type>(1), c)`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hell";

  // 末尾に'o'を追加する
  s.push_back('o');

  std::cout << s << std::endl;
}
```
* push_back[color ff0000]

### 出力
```
hello
```

## 参照

