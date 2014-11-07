#emplace
```cpp
template <class... Args>
void emplace(Args&&... args);
```

##概要
要素型`T`のコンストラクタ引数をとり、直接構築でスタックに要素を追加する。


##効果
`c.emplace_back(std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...);`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <stack>

struct MyObj
{
  MyObj(int i) { std::cout << i << " "; }
  MyObj(const MyObj&) { std::cout << "copy "; }
  MyObj(const MyObj&&) { std::cout << "move "; }
  MyObj& operator=(const MyObj&) { std::cout << "assign "; return *this; }
};

int main ()
{
  std::stack<MyObj> mystack;

  std::cout << "stack::push ";
  for (int i = 0; i < 5; ++i)
  {
    mystack.push(i);
  }
  std::cout << std::endl;

  std::cout << "stack::emplace ";
  for (int i = 0; i < 5; ++i)
  {
    mystack.emplace(i);
  }
  std::cout << std::endl;

  return 0;
}
```
* emplace[color ff0000]

###出力
```
stack::push 0 move 1 move 2 move 3 move 4 move 
stack::emplace 0 1 2 3 4 
```

##参照

