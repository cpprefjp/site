#assign
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& assign(const basic_string& str);
basic_string& assign(basic_string&& str) noexcept; // C++11から
basic_string& assign(const basic_string& str, size_type pos,
                     size_type n);
basic_string& assign(const charT* s, size_type n);
basic_string& assign(const charT* s);
basic_string& assign(size_type n, charT c);

template<class InputIterator>
basic_string& assign(InputIterator first, InputIterator last);

basic_string& assign(initializer_list<charT>); // C++11から
```

##概要
文字列の再代入を行う。

この関数は、アロケータを除き、`basic_string`クラスのコンストラクタと同様のパラメータを受け取り、再代入を行う。代入演算子が一つのパラメータしか扱えないため、複数パラメータによる代入として使用する。


- `basic_string& assign(const basic_string& str);`

コピー代入。`str`オブジェクトと同じ文字列を構築する。


- `basic_string& assign(basic_string&& str) noexcept;`

ムーブ代入。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。


- `basic_string& assign(const basic_string& str, size_type pos, size_type n);`

`str`オブジェクトの部分文字列のコピーから構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。


- `basic_string& assign(const charT* s, size_type n);`

文字配列`s`の先頭`n`文字からなる部分文字列のコピーから構築する。


- `basic_string& assign(const charT* s);`

文字配列`s`のコピーから構築する。


- `basic_string& assign(size_type n, charT c);`

文字`c`の`n`回繰り返した文字列からなる`basic_string`オブジェクトを構築する。


- `template <class InputIterator>`<br/>`basic_string& assign(InputIterator first, InputIterator last);`

文字列の範囲`[begin, end)`から`basic_string`オブジェクトを構築する。


- `basic_string& assign(initializer_list<charT>);`

文字の初期化子リストから`basic_string`オブジェクトを構築する。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  // コピー代入
  std::string s1;
  std::string s1_tmp = "hello";
  s1.assign(s1_tmp);
  std::cout << "s1 : " << s1 << std::endl;

  // ムーブ代入
  std::string s2;
  s2.assign(std::string("hello"));
  std::cout << "s2 : " << s2 << std::endl;

  // 部分文字列のコピーを代入
  // s4文字列オブジェクトの1番目の文字から3文字
  std::string s3;
  s3.assign(s2, 1, 3);
  std::cout << "s3 : " << s3 << std::endl;

  // 文字配列の先頭N文字を代入
  std::string s4;
  s4.assign("hello", 3);
  std::cout << "s4 : " << s4 << std::endl;

  // 文字配列を代入
  std::string s5;
  s5.assign("hello");
  std::cout << "s5 : " << s5 << std::endl;

  // 文字をN回繰り返して代入
  std::string s6;
  s6.assign(3, 'a');
  std::cout << "s6 : " << s6 << std::endl;

  // 文字列の範囲を代入
  std::string s7;
  s7.assign(s1.begin(), s1.end());
  std::cout << "s7 : " << s7 << std::endl;

  // 文字の初期化子リストを代入
  std::string s8;
  s8.assign({'h', 'e', 'l', 'l', 'o'});
  std::cout << "s8 : " << s8 << std::endl;
}
```

###出力
```
s1 : hello
s2 : hello
s3 : ell
s4 : hel
s5 : hello
s6 : aaa
s7 : hello
s8 : hello
```

##参照

