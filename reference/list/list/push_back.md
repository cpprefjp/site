# push_back
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void push_back(const T& x); // (1)
void push_back(T&& x);      // (2) C++11
```

## 概要
新たな要素を末尾に追加する。


## 戻り値
なし


## 計算量
定数時間


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <list>
#include <string>
#include <algorithm>

int main()
{
  std::list<std::string> ls;

  // const&バージョン
  std::string s = "hello";
  ls.push_back(s);

  // &&バージョン
  ls.push_back(std::string("world"));

  for (const std::string& x : ls) {
    std::cout << x << std::endl;
  };
}
```
* push_back[color ff0000]

#### 出力
```
hello
world
```


### イテレート中に要素を追加する (C++03)
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls;
  ls.push_back(3);

  // リストが空になるまで処理をし続ける
  while (!ls.empty()) {
    int x = ls.front();
    ls.pop_front();

    std::cout << x << std::endl;

    // イテレート中にさらに要素が追加される可能性がある。
    //   これはたとえば、イベントキューの実装として使われる。
    //   イベントハンドラ (コールバック関数) のなかでさらにイベントが登録される、
    //   というような状況で、イテレート中に要素追加することが必要になる。
    //
    // ただし、範囲for文のなかでこのようなことをしてはならない (ここではwhile文を使用している)。
    // 範囲for文では終端イテレータは最初に一度のみ取得されるため、イテレート中に
    // 要素が増えても終端イテレータは変わらず、未定義動作になる可能性がある
    if (x > 0) {
      ls.push_back(x - 1);
    }
    else {
      // 要素が追加されなくなったら終了
    }
  }
}
```
* ls.empty()[link empty.md]
* ls.front()[link front.md]
* ls.pop_front()[link pop_front.md]


#### 出力
```
3
2
1
0
```
