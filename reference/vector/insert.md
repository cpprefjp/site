#insert(C++11)
```cpp
iterator insert(const_iterator position, const T& x);

iterator insert(const_iterator position, T&& x);

iterator insert(const_iterator position, size_type n, const T& x);

template <class InputIterator>
iterator insert(const_iterator position, InputIterator first, InputIterator last);

iterator insert(const_iterator position, initializer_list<T> il);
```

##概要
任意の位置に新たな要素を挿入する


##戻り値
挿入された要素を指すイテレータ


##計算量
挿入される要素の数と挿入される要素の位置と[`end()`](./end.md)の間の要素数に対して線形時間の計算量が必要である。


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
  std::vector<std::string> v = {"aaa", "bbb", "ccc"};

  // 挿入位置と、追加するconst&の要素を指定するバージョン
  {
    std::string s = "ddd";
    v.insert(v.begin() + 1, s);
  }

  // 挿入位置と、追加する&&の要素を指定するバージョン
  {
    v.insert(v.begin() + 1, std::string("eee"));
  }

  // 挿入位置とイテレータの範囲を指定するバージョン
  {
    std::vector<std::string> x = {"fff", "ggg"};
    v.insert(v.begin() + 1, x.begin(), x.end());
  }

  // 挿入位置と初期化子リストを指定するバージョン
  {
    v.insert(v.begin() + 1, {"hhh", "iii"});
  }

  std::for_each(v.begin(), v.end(), [](decltype(v)::const_reference x) {
    std::cout << x << std::endl;
  });
}
```
* insert[color ff0000]

###出力
```
aaa
hhh
iii
fff
ggg
eee
ddd
bbb
ccc
```

##バージョン
###言語
- C++11 :右辺参照バージョン
	- [Clang](/implementation#clang.md): ??
	- [GCC](/implementation#gcc.md): 
	- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
	- [ICC](/implementation#icc.md): ??
	- [Visual C++](/implementation#visual_cpp.md) 10.0

- C++11 : 初期化子リストバージョン
	- [Clang](/implementation#clang.md): ??
	- [GCC](/implementation#gcc.md): 
	- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
	- [ICC](/implementation#icc.md): ??
	- [Visual C++](/implementation#visual_cpp.md) 


