#push_back
* vector[meta header]
* std[meta namespace]

```cpp
void push_back(const T& x);

// C++11から
void push_back(T&& x);
```

##概要
新たな要素を末尾に追加する。


##戻り値
なし


##計算量
定数時間


##備考
要素を追加した後の[`size()`](./size.md)が要素を追加する前の[`capacity()`](./capacity.md)よりも大きい場合は領域の再確保が生じる。領域の再確保が生じなかった場合には全てのイテレーターや参照は有効である。もし、例外が発生した場合には副作用が発生しない。（コピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入、および、InputIterator操作で例外が発生した場合を除く。）もし、非CopyInsertableな型Tのムーブコンストラクタで例外が発生した場合、副作用は未規定。


##例
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::string> v;

  // const&バージョン
  std::string s = "hello";
  v.push_back(s);

  // &&バージョン
  v.push_back(std::string("world"));

  std::for_each(v.begin(), v.end(), [](const std::string& x) {
    std::cout << x << std::endl;
  });
}
```
* push_back[color ff0000]

###出力
```
hello
world
```

