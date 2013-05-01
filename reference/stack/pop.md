#pop
```cpp
void pop();
```

##概要
<b>スタックトップ(コンテナの末尾側)の要素を削除する。内部でスタックを実装するコンテナオブジェクトのpop_back()メンバ関数が呼び出される。</b>

##戻り値
なし。


##計算量
Container::pop_backと同じ。


##例
<pre style='margin-top:0px;margin-bottom:0px'><dfn/>```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int> mystack;

  for (int i = 0; i < 5; ++i) mystack.push(i);

  std::cout << "Popping out elements...";
  while (!mystack.empty())
  {
     std::cout << " " << mystack.top();
     mystack.pop();
  }
  std::cout << std::endl;

  return 0;
}
</pre>
```

##出力
```cpp
<pre style='margin-top:0px;margin-bottom:0px;color:rgb(0,0,0);font-size:12px;line-height:normal'><samp>Popping out elements... 4 3 2 1 0</samp></pre>
```

##実装例
```cpp
void pop() { c.pop_back(); }
```

##参照

TBD
