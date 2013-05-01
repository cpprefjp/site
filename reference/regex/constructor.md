#constructor

| | |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| basic_regex(); | どんな文字列にもマッチしないインスタンスを生成する。 |
| explicit basic_regex(   const charT* p,   flag_type f = regex_constants::ECMAScript ); | 与えられた正規表現にマッチするインスタンスを生成する。fにはawk、grep、egrepなどの正規表現の方言を指定できる。 |
| basic_regex(   const charT* p, size_t len,   flag_type f = regex_constants::ECMAScript ); | 正規表現の文字列の長さを指定するタイプのコンストラクタ。コンストラクタに渡す正規表現がNULL終端してなくてもよい。 |
| basic_regex( const basic_regex& ); | コピーコンストラクタ。 |
| basic_regex( basic_regex&& ) noexcept ; | ムーブコンストラクタ。 |
| template <class ST, class SA>   explicit basic_regex(     const basic_string<charT, ST, SA>& p,     flag_type f = regex_constants::ECMAScript ); | C文字列ではなく、std::[basic_string](/reference/string.md)から構築するタイプのコンストラクタ。 |
| template <class ForwardIterator>   basic_regex(     ForwardIterator first, ForwardIterator last,     flag_type f = regex_constants::ECMAScript ); | 正規表現文字列をイテレータで渡すタイプのコンストラクタ。 |
| basic_regex(   initializer_list<charT>,   flag_type = regex_constants::ECMAScript ); | 文字のリストによって正規表現を指定するタイプのコンストラクタ。basic_regex<char> r = { 'h', 'o', 'g', 'e' };のように呼び出す。 |





