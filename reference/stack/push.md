# push
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
void push(const value_type& x); // (1)
void push(value_type&& x);      // (2) C++11
```

## 概要
新しい要素を `stack` の末尾に追加し、そのインスタンスを`x`のコピー、もしくはムーブして初期化する。


## 効果
- (1) :

    ```cpp
    c.push_back(x);
    ```

- (2) :

    ```cpp
    c.push_back(std::move(x));
    ```
    * std::move[link /reference/utility/move.md]


## 戻り値
なし


## 計算量
`Container::push_back()`と同じ。


## 例
```cpp
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> st;

  // 要素を追加
  st.push(1);
  st.push(2);
  st.push(3);

  while (!st.empty()) {
    std::cout << st.top() << " "; // 末尾要素を参照する
    st.pop(); // 末尾要素を削除
  }
}
```
* push[color ff0000]
* st.empty()[link empty.md]
* st.top()[link top.md]
* st.pop()[link pop.md]

### 出力
```
3 2 1 
```

## 実装例
```cpp
void push(const value_type& x) { c.push_back(x); }
void push(value_type&& x) { c.push_back(std::move(x)); }
```


