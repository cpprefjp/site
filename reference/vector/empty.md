#empty
```cpp
bool empty() const noexcept;
```

##概要
<b>コンテナが空かどうかを判定する</b>


##戻り値

コンテナが空であれば`true`、そうでなければ`false`を返す。


##計算量

定数時間

##例外
投げない

##計算量
定数時間

##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  // 空
  {
    std::vector<int> v;
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::vector<int> v = {1, 2, 3};
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty[color ff0000]
* empty[color ff0000]

###出力例
```cpp
true
false
```

##備考
a.empty() と a.begin() == a.end() は同じ結果になる。

##バージョン

###言語

- C++03
- C++11

###処理系

- [Clang](/implementation#clang.md): 1.9, 2.9
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.4, 4.5.2, 4.6.1
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0


##参照

