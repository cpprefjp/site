#at
```cpp
T& at(const key_type& x);
const T& at(const key_type & x) const;
```

##概要
参照のためのメソッドで、取り出す時にキーの存在チェックをする。

##戻り値
キーxに対応する値を返す。オブジェクトが存在しないときは、out_of_range例外を投げる。

##計算量
要素数に対して対数時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

template<class Container, class T>
void at_wrap(Container &c, T v) {

  try{
    cout << c.at(v) << endl;
  }
  catch(out_of_range&) {
    cout << "exception std::out_of_ranget" << endl;
  }
}

int main()
{
  map<int,char> s1;
  s1.insert(std::make_pair(1,'a'));

  at_wrap(s1, 1);
  at_wrap(s1, 2);

  return 0;
}
```

###出力
```
a
exception std::out_of_ranget
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------|-----------------------|
| [`operator=`](./op_assign.md) | 代入演算子 |
| [`insert`](./insert.md) | 要素を挿入する |


