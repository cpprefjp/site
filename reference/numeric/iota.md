#iota
```cpp
namespace std{
  template <class ForwardIterator, class T>
  void iota(ForwardIterator first, ForwardIterator last, T value);
}
```

##概要
全ての要素に対して、first から順番に *it = value; ++value; を行う

##パラメータ

| | |
|-------|--------------------------|
| first | シーケンスの先頭 |
| last | シーケンスの終端 |
| value | 初期値 |


##戻り値
なし

##計算量
n 回のインクリメントと代入が行われる。

##例
```cpp
#include <numeric>
#include <iostream>
#include <string>

int main(){
  std::string s = "hello, iota!";
  std::cout << s << std::endl;
  std::iota(s.begin(), s.end(), 'A');
  std::cout << s << std::endl;
}
```
* std::iota[color ff0000]






###出力
```cpp
hello, iota!
ABCDEFGHIJKL
```

##バージョン


###言語


- C++11以降



###処理系


- GCC: 4.5.0以降

- Visual C++ 9.0以降

