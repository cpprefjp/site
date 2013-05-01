#size
```cpp
size_type size() const;
```

##概要

<b>stack </b><b> に格納されている要素の個数を返す。</b>
<b>内部のコンテナの size() メンバ関数を呼ぶ。</b>

<b>
</b>
<b></b>
<b>効果</b>

return c.size();



##戻り値

stack の内部のコンテナに含まれている要素の個数。



##計算量





##例

```cpp
#include <iostream>

#include <stack>
```

int main(int argc, char** argv)

{
  std::stack<int>  st;

  // 要素を 1 個追加
  st.push(3);

  // 要素数を表示
  std::cout << st.<color=ff0000>size</color>() << std::endl;

  // 要素を 5 個追加
  st.push(1);
  st.push(4);
  st.push(1);
  st.push(5);
  st.push(9);

  // 要素数を表示
  std::cout << st.<color=ff0000>size</color>() << std::endl;

}




###出力

```cpp
1
6
```

##実装例

```cpp
size_type size() const { return c.size(); }
```

##参照

| | |
|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| <br/>[empty](/reference/stack/empty.md) | <br/>コンテナが空であるかを確認する (publicメンバ関数)  |

