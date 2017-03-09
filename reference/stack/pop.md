#pop
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
void pop();
```

##概要
スタックトップ(コンテナの末尾側)の要素を削除する。内部でスタックを実装するコンテナオブジェクトの`pop_back()`メンバ関数が呼び出される。


##効果
```cpp
c.pop_back();
```


##戻り値
なし。


##計算量
`Container::pop_back()`と同じ。


##例
```cpp
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> st;

  for (int i = 0; i < 5; ++i)
    st.push(i);

  std::cout << "Popping out elements...";
  while (!st.empty())
  {
     std::cout << " " << st.top();
     st.pop();
  }
  std::cout << std::endl;

  return 0;
}
```

###出力
```
Popping out elements... 4 3 2 1 0 
```

##実装例
```cpp
void pop() { c.pop_back(); }
```

