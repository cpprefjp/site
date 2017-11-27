# operator=
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
stack& operator=(const stack& st); // (1)
stack& operator=(stack&& st);      // (2) C++11
```

## 概要
コピーまたはムーブを行う事で、他の `stack` から `stack` を構築する。


## パラメータ
`st`: コピー・ムーブ元の `stack` オブジェクト


## 戻り値
`*this`


## 計算量
線形 O(n)。


## 例
```cpp example
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> st0;
  std::stack<int> st1;

  // 要素を追加
  st0.push(1);
  st0.push(2);
  st0.push(3);

  // st1 に st0 を代入
  st1 = st0;

  // st1 の内容を表示
  while (!st1.empty()) {
    std::cout << st1.top() << " "; // 末尾要素を参照する
    st1.pop(); // 末尾要素を削除
  }
}
```
* st1 = st0;[color ff0000]
* st0.push[link push.md]
* st1.empty()[link empty.md]
* st1.top()[link top.md]
* st1.pop()[link pop.md]

### 出力
```
3 2 1 
```

## 参照
| | |
|--------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ |


