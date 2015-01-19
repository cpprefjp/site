#コンストラクタ
```cpp
list();                                        // (1) C++11
list(const Allocator&);                        // (2) C++11
explicit list(const Allocator& = Allocator()); // (1), (2) C++03。C++11で削除

explicit list(size_type n,
              const Allocator& = Allocator()); // (3)

list(size_type n, const T& value,
     const Allocator& = Allocator());          // (4)

template <class InputIterator>
list(InputIterator first, InputIterator last,
     const Allocator& = Allocator());          // (5)

list(const list& x);                           // (6)
list(list&& x);                                // (7) C++11
list(const list& x, const Allocator&);         // (8) C++11
list(list&& x, const Allocator&);              // (9) C++11

list(initializer_list<T>,
     const Allocator& = Allocator());          // (10) C++11
```
* initializer_list[link /reference/initializer_list.md]

##list オブジェクトの構築
- (1) : デフォルトコンストラクタ。アロケータをデフォルト構築して、空のコンテナを作る。
- (2) : アロケータを指定して空のコンテナを作る。
- (3) : `n` 個の `T()` 初期化された要素を保持した `list` を構築する。
- (4) : `value` のコピーを `n` 個要素として保持した `list` を構築する。
- (5) : `[first, last)` の範囲を要素としてコピーした `list` を構築する。
- (6) : コピーコンストラクタ。`x` と同じ要素を保持した `list` を構築する。
- (7) : ムーブコンストラクタ。`x` の指す先を自分の領域として `list` を構築する。
- (8) : アロケータを指定したコピーコンストラクタ。
- (9) : アロケータを指定したムーブコンストラクタ。
- (10) : 初期化子リストを受け取るコンストラクタ。


##計算量
- (1), (2) : 定数時間
- (3), (4) : `n` に対して線形時間
- (5) : [`distance`](/reference/iterator/distance.md)`(first, last)` に対して線形時間


##例
```cpp
#include <iostream>
#include <list>
#include <string>
#include <utility>  // move

template <class T>
void  print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}

int main ()
{
  // デフォルト構築
  std::list<int>  ls1;
  print("ls1", ls1);

  // n 個の要素を持つリストを作成
  std::list<int>  ls2(3);
  print("ls2", ls2);

  // n 個の指定された値を要素に持つリストを作成
  std::list<int>  ls3(3, 1);
  print("ls3", ls3);

  // 範囲から構築
  std::list<int>  ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // コピー構築
  std::list<int>  ls5  =  ls4;
  print("ls5", ls5);

  // ムーブ構築
  std::list<int>  ls6  =  std::move(ls5);
  print("ls6", ls6);

  // 初期化子リストで構築
  std::list<int>  ls7  =  { 1, 2, 3 };
  print("ls7", ls7);
}
```

###出力
```
ls1 : 
ls2 : 0 0 0 
ls3 : 1 1 1 
ls4 : 1 1 1 
ls5 : 1 1 1 
ls6 : 1 1 1 
ls7 : 1 2 3 
```

##参照


