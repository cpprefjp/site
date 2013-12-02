#swap
```cpp
void swap(basic_string& str);
```

##概要
他の`basic_string`オブジェクトとデータを入れ替える。


##効果
`*this`の内容を`str`と交換する。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string a = "hello";
  std::string b = "world";

  a.swap(b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* swap[color ff0000]

###出力
```
world
hello
```

